import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string | null;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitConsultation(name, email, phone ?? "", message);
    },
  });
}

export function useGetAllConsultations() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["consultations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllConsultations();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useGetPageVisitCount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["pageVisitCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getPageVisitCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateConsultationStatus() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateConsultationStatus(id, status);
    },
  });
}
