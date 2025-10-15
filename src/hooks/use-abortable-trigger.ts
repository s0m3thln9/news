import { useEffect, useRef } from "react"

type TriggerResult<TResult> = {
  unwrap: () => Promise<TResult>
  abort?: () => void
}

type TriggerLike<TArg, TResult> = (arg: TArg) => TriggerResult<TResult>

export function useAbortableTrigger<TArg, TResult>(
  trigger: TriggerLike<TArg, TResult>,
) {
  const pendingRequestRef = useRef<TriggerResult<TResult> | null>(null)

  useEffect(() => {
    return () => {
      if (
        pendingRequestRef.current &&
        typeof pendingRequestRef.current.abort === "function"
      ) {
        pendingRequestRef.current.abort()
      }
    }
  }, [])

  return async (arg: TArg): Promise<TResult> => {
    if (
      pendingRequestRef.current &&
      typeof pendingRequestRef.current.abort === "function"
    ) {
      pendingRequestRef.current.abort()
    }
    const promise = trigger(arg)
    pendingRequestRef.current = promise
    return await promise.unwrap()
  }
}
