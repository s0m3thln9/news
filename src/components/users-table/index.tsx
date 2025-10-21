"use client"

import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { IconButton, TextField, Tooltip, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useGetDateKey } from "@/utils/use-get-date-key"
import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "@/providers/i18n-provider"
import { useUsers } from "@/components/users-table/use-users"
import { setOffsetToTable } from "@/components/users-table/slice"
import { useDeleteUser } from "@/components/users-table/use-delete-user"
import {
  setEditUserAdminCurrent,
  setEditUserAdminModalOpen,
} from "@/components/users-table/update-user-modal/slice"
import { UpdateUserAdminModal } from "@/components/users-table/update-user-modal"

export const UsersTable = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const {
    users,
    total,
    limit,
    isFetching,
    refetch,
    handleSearchQueryChange,
    searchQuery,
  } = useUsers()
  const deleteUser = useDeleteUser()
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

  const handleEditClicked = (uuid: string) => {
    dispatch(setEditUserAdminModalOpen(true))
    dispatch(
      setEditUserAdminCurrent(users.find((user) => user.uuid === uuid) || null),
    )
  }

  const rows = users.map((user) => ({
    id: user.uuid,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    date: getDateKey(user.createdAt),
  }))

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "fullName",
      headerName: t("users.fullName"),
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: t("profile.email"),
      width: 250,
      editable: true,
    },
    {
      field: "date",
      headerName: t("common.date"),
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: t("profile.role"),
      width: 180,
      editable: true,
    },
    {
      field: "edit",
      headerName: t("common.edit"),
      type: "actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={t("common.edit")}>
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
      headerName: t("common.delete"),
      type: "actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={t("common.delete")}>
            <IconButton
              size="small"
              onClick={() => deleteUser({ uuid: params.row.id }, refetch)}
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
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        {t("users.allUsers")}
      </Typography>
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
            "& .MuiDataGrid-cell": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            "& .MuiDataGrid-toolbarContainer, & .MuiDataGrid-footerContainer": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            "& .MuiCheckbox-root": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            backgroundColor: "white",
          }}
        />
      </Box>
      <UpdateUserAdminModal />
    </>
  )
}
