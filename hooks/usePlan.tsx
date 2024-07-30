import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPlansAPI,
  GetPlans200,
  GetPlansInclude,
  InternalServerErrorResponse,
  createPlanAPI,
  CreatePlan201,
  CreatePlan422,
  updatePlanAPI,
  UpdatePlanBody,
  UpdatePlan201,
  UpdatePlan404,
  deletePlanAPI,
  DeletePlan202,
  DeletePlan404,
  createPlanDocumentAPI,
  CreatePlanDocument201,
  CreatePlanDocumentBody,
  CreatePlanDocument422,
  updatePlanDocumentAPI,
  UpdatePlanDocumentBody,
  UpdatePlanDocument201,
  UpdatePlanDocument404,
  UpdatePlanDocument422,
  deletePlanDocumentAPI,
  DeletePlanDocument202,
  DeletePlanDocument404,
  getPlanAPI,
  GetPlanParams,
  GetPlan200,
  GetPlan404,
} from "@/services";
import { AxiosError, AxiosResponse } from "axios";
import { showFlashError } from "@/utils/common";
import { parseClientMessage } from "@/services/helpers";
import { router } from "expo-router";

export default function usePlan({ planId }: { planId?: string }) {
  const queryClient = useQueryClient();

  const getPlans = useMutation({
    mutationFn: ({
      page,
      perPage,
      include,
    }: {
      page?: number;
      perPage?: number;
      include?: GetPlansInclude;
    }) => getPlansAPI({ page, perPage, include }),
    onSuccess: ({ data, meta, included }: GetPlans200) => {
      queryClient.setQueryData(["dataPlans"], data);
      queryClient.setQueryData(["metaPlans"], meta);
      queryClient.setQueryData(["includedPlans"], included);
    },
    onError: ({ response }: AxiosError<InternalServerErrorResponse>) => {
      console.log(response);
    },
  });

  const createPlan = useMutation({
    mutationFn: ({ title, date }: { title: string; date: string }) =>
      createPlanAPI({
        title,
        date,
      }),
    onSuccess: ({ data }: CreatePlan201) => {
      queryClient.setQueryData(["planIdCreated"], data?.id);
    },
    onError: ({ response }: AxiosError<CreatePlan422>) => {
      if (response?.status === 422) {
        showFlashError(parseClientMessage(response?.data?.errors!)[0]);
      }
    },
  });

  const getPlan = useMutation({
    mutationFn: ({ id, params }: { id: string; params: GetPlanParams }) =>
      getPlanAPI(id, params),
    onSuccess: ({ data, included }: GetPlan200) => {
      queryClient.invalidateQueries({
        queryKey: ["planDocuments"],
        exact: true,
        refetchType: "all",
      });
      queryClient.setQueryData(["planDocuments"], included);
    },
    onError: ({ response }: AxiosError<GetPlan404>) => {
      console.log(response);
    },
  });

  const updatePlan = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePlanBody }) =>
      updatePlanAPI(id, payload),
    onSuccess: ({ data }: UpdatePlan201) => {},
    onError: ({ response }: AxiosError<UpdatePlan404>) => {
      console.log(response);
    },
  });

  const deletePlan = useMutation({
    mutationFn: ({ id }: { id: string }) => deletePlanAPI(id),
    onSuccess: ({ message }: DeletePlan202) => {
      if (message) {
        router.dismiss(1);
      }
    },
    onError: ({ response }: AxiosError<DeletePlan404>) => {
      console.log(response);
    },
  });

  const createPlanDocument = useMutation({
    mutationFn: async ({ payload }: { payload: CreatePlanDocumentBody }) =>
      await createPlanDocumentAPI(payload),
    onSuccess: ({ data }: CreatePlanDocument201) => {
      getPlan.mutate({
        id: planId!,
        params: {
          include: "documents",
        },
      });
    },
    onError: ({ response }: AxiosError<CreatePlanDocument422>) => {
      console.log(response);
    },
  });

  const updatePlanDocument = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePlanDocumentBody;
    }) => updatePlanDocumentAPI(id, payload),
    onSuccess: ({ data }: UpdatePlanDocument201) => {
      getPlan.mutate({
        id: planId!,
        params: {
          include: "documents",
        },
      });
    },
    onError: ({
      response,
    }: AxiosError<UpdatePlanDocument404 | UpdatePlanDocument422>) => {
      console.log(response);
    },
  });

  const deletePlanDocument = useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      await deletePlanDocumentAPI(id),
    onSuccess: ({ message }: DeletePlanDocument202) => {
      getPlan.mutate({
        id: planId!,
        params: {
          include: "documents",
        },
      });
    },
    onError: ({ response }: AxiosError<DeletePlanDocument404>) => {
      console.log(response);
    },
  });

  return {
    getPlans,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan,
    createPlanDocument,
    updatePlanDocument,
    deletePlanDocument,
  };
}
