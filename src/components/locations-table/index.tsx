"use client"

import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { Button, IconButton, TextField, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useGetDateKey } from "@/utils/use-get-date-key"
import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "@/providers/i18n-provider"
import { useAdminLocations } from "@/components/locations-table/use-admin-locations"
import { useDeleteLocation } from "@/components/locations-table/use-delete-location"
import { setOffsetToTable } from "@/components/locations-table/slice"
import { UpdateLocationModal } from "@/components/locations-table/update-locations-modal"
import {
  setEditLocationCurrent,
  setEditLocationModalOpen,
} from "@/components/locations-table/update-locations-modal/slice"
import { setCreateLocationModalOpen } from "@/components/locations-table/create-locations-modal/slice"
import { CreateLocationModal } from "@/components/locations-table/create-locations-modal"

export const LocationsTable = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const {
    locations,
    total,
    limit,
    isFetching,
    refetch,
    handleSearchQueryChange,
    searchQuery,
  } = useAdminLocations()
  const deleteLocation = useDeleteLocation()
  const getDateKey = useGetDateKey()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: limit,
  })

  const handlePaginationChange = (pagination: {
    page: number
    pageSize: number
  }) => {
    setPaginationModel(pagination)
    dispatch(setOffsetToTable(pagination.page * pagination.pageSize))
  }

  const rows = locations.map((location) => ({
    id: location.uuid,
    title: location.title,
    date: getDateKey(location.createdAt),
  }))

  const handleEditClicked = (uuid: string) => {
    dispatch(setEditLocationModalOpen(true))
    dispatch(
      setEditLocationCurrent(
        locations.find((location) => location.uuid === uuid) || null,
      ),
    )
  }

  const handleCreateClicked = () => {
    dispatch(setCreateLocationModalOpen(true))
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEditClicked(params.row.id)}
              sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            >
              <EditIcon className={"fill-primary-main"} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => deleteLocation({ uuid: params.row.id }, refetch)}
              sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            >
              <DeleteIcon className={"fill-primary-main"} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <>
      <Box className={"flex flex-col gap-6 [&_*]:!text-black"}>
        <Box className={"flex gap-4"}>
          <TextField
            variant="filled"
            size="small"
            placeholder={t("common.searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="border-primary-main rounded-none border bg-white text-sm max-lg:w-full"
            sx={{
              width: 300,
              "& .MuiInputBase-input": {
                transition: "all 0.3s ease",
                padding: "16px",
                fontSize: 14,
                fontWeight: "bold",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <SearchIcon
                    fontSize="large"
                    className={"fill-primary-main"}
                  />
                ),
              },
            }}
          />
          <Button
            onClick={handleCreateClicked}
            variant={"contained"}
            sx={{ color: "white" }}
          >
            {t("locations.createLocation")}
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: limit,
              },
            },
          }}
          pageSizeOptions={[limit]}
          checkboxSelection={false}
          loading={isFetching}
          disableRowSelectionOnClick
          paginationMode="server"
          rowCount={total}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          sx={{
            // Тёмный текст для ячеек
            "& .MuiDataGrid-cell": {
              color: "rgba(0, 0, 0, 0.87)", // Основной тёмный цвет MUI, или просто 'black'
            },
            // Тёмный текст для заголовков колонок
            "& .MuiDataGrid-columnHeader": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            // Тёмный текст для пагинации (нижняя панель)
            "& .MuiDataGrid-toolbarContainer, & .MuiDataGrid-footerContainer": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            // Если нужно для чекбоксов или других элементов
            "& .MuiCheckbox-root": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            // Общий корень, если нужно переопределить фон (для светлой таблицы)
            backgroundColor: "white", // Убедись, что фон светлый
          }}
        />
      </Box>
      <UpdateLocationModal />
      <CreateLocationModal refetch={refetch} />
    </>
  )
}
