"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch } from "./use-app-dispatch"
import { useAppSelector } from "./use-app-selector"
import { setCurrentLocation } from "@/features/locations/slice"
import {
  setOffset,
  setSearchQuery,
  setTotal,
} from "@/features/search-news/slice"

export const useLocationHandlers = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const locations = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const currentLocation = useAppSelector(
    (state) => state.locationsSlice.currentLocation,
  )

  const findLocation = (uuid: string) =>
    locations.find((location) => location.uuid === uuid) || null

  const isBrothers = (uuid: string) =>
    brothers?.uuid === uuid ? brothers : null

  const resetSearchParams = () => {
    dispatch(setSearchQuery(""))
    dispatch(setOffset(0))
    dispatch(setTotal(-1))
  }

  const handleLocationSelect = (uuid: string) => {
    if (uuid === null) {
      return
    }

    if (
      currentLocation?.uuid === uuid &&
      currentLocation?.uuid !== brothers?.uuid
    )
      return null
    const newLocation = findLocation(uuid) || isBrothers(uuid)
    dispatch(setCurrentLocation(newLocation))
    resetSearchParams()
    router.push(`/locations/${uuid}`)
  }

  const handleHomeClick = () => {
    dispatch(setCurrentLocation(null))
    resetSearchParams()
    router.push("/")
  }

  return {
    locations,
    brothers,
    currentLocation,
    findLocation,
    isBrothers,
    resetSearchParams,
    handleLocationSelect,
    handleHomeClick,
  }
}
