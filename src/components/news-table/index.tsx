"use client"

import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useAdminNews } from "@/components/news-table/use-admin-news"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setOffsetToTable, setOrderBy } from "@/components/news-table/slice"
import {
  Checkbox,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { useAppSelector } from "@/hooks/use-app-selector"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useDeleteNews } from "@/components/news-table/use-delete-news"
import { useGetDateKey } from "@/utils/use-get-date-key"
import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "@/providers/i18n-provider"
import { SelectBody, SelectRoot, SelectTrigger } from "@/components/ui/select"
import { Select } from "@base-ui-components/react/select"
import {
  setEditNewsCurrent,
  setEditNewsModalOpen,
} from "@/components/news-table/update-news-modal/slice"
import { UpdateNewsModal } from "@/components/news-table/update-news-modal"
import { useTogglePinNews } from "@/components/news-table/use-toogle-pin-news"
import { UserRole } from "@/generated/prisma"

export const NewsTable = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const locs = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const locations = brothers ? [...locs, brothers] : locs

  const userRole = useAppSelector((state) => state.userSlice.user?.role)
  const isAdmin = userRole === UserRole.ADMIN

  const {
    news,
    total,
    limit,
    isFetching,
    refetch,
    handleSearchQueryChange,
    searchQuery,
    orderBy,
  } = useAdminNews()
  const deleteNews = useDeleteNews()
  const togglePinNews = useTogglePinNews()
  const getDateKey = useGetDateKey()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: limit,
  })

  const handleOrderByChange = (newValue: string) => {
    dispatch(setOrderBy(newValue as "asc" | "desc"))
  }

  const handlePaginationChange = (pagination: {
    page: number
    pageSize: number
  }) => {
    setPaginationModel(pagination)
    dispatch(setOffsetToTable(pagination.page * pagination.pageSize))
  }

  const rows = news.map((newsItem) => ({
    id: newsItem.uuid,
    title: newsItem.title,
    location: locations.find(
      (location) => location.uuid === newsItem.locationUuid,
    )?.title,
    date: getDateKey(newsItem.createdAt),
  }))

  const handleEditClicked = (uuid: string) => {
    dispatch(setEditNewsModalOpen(true))
    dispatch(setEditNewsCurrent(news.find((n) => n.uuid === uuid) || null))
  }

  const isNewsPinned = (uuid: string) =>
    !!news.find((newsItem) => newsItem.uuid === uuid)?.pinnedAt

  const baseColumns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "title",
      headerName: t("news.title"),
      flex: 1,
      editable: true,
    },
    {
      field: "location",
      headerName: t("news.location"),
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: t("common.date"),
      width: 180,
      editable: true,
    },
  ]

  const pinColumn: GridColDef<(typeof rows)[number]> = {
    field: "pin",
    headerName: t("common.pin"),
    type: "actions",
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title={t("common.pin")}>
          <Checkbox
            checked={isNewsPinned(params.row.id)}
            onChange={() => togglePinNews(params.row.id, refetch)}
          />
        </Tooltip>
      </Box>
    ),
  }

  const actionColumns: GridColDef<(typeof rows)[number]>[] = [
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
              onClick={() => deleteNews({ uuid: params.row.id }, refetch)}
              sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            >
              <DeleteIcon className={"fill-primary-main"} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const columns: GridColDef<(typeof rows)[number]>[] = [
    ...baseColumns,
    ...(isAdmin ? [pinColumn] : []),
    ...actionColumns,
  ]

  const sortOptions = [
    { label: t("news.sortNewest"), value: "desc" },
    { label: t("news.sortOldest"), value: "asc" },
  ]

  return (
    <>
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        {t("news.allNews")}
      </Typography>
      <Box className={"mt-10 flex flex-col gap-6 [&_*]:!text-black"}>
        <Box className={"flex items-stretch gap-4"}>
          <SelectRoot
            items={sortOptions}
            value={orderBy}
            onValueChange={handleOrderByChange}
          >
            <SelectTrigger
              iconClassName={"fill-primary-main"}
              className={"border-primary-main border"}
            />
            <SelectBody>
              {sortOptions.map(({ value, label }) => (
                <Select.Item
                  key={value}
                  value={value}
                  className="hover:bg-primary-main/10 relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none select-none"
                >
                  <Select.ItemText className="font-normal">
                    {label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </SelectBody>
          </SelectRoot>
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
      <UpdateNewsModal />
    </>
  )
}
