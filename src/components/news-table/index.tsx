"use client"

import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useAdminNews } from "@/components/news-table/use-admin-news"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setOffsetToTable, setOrderBy } from "@/components/news-table/slice"
import { IconButton, TextField, Tooltip } from "@mui/material"
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

export const NewsTable = () => {
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const locs = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const locations = brothers ? [...locs, brothers] : locs
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

  const rows = news.map((news) => ({
    id: news.uuid,
    title: news.title,
    location: locations.find((location) => location.uuid === news.locationUuid)
      ?.title,
    date: getDateKey(news.createdAt),
  }))

  const handleEditClicked = (uuid: string) => {
    dispatch(setEditNewsModalOpen(true))
    dispatch(setEditNewsCurrent(news.find((n) => n.uuid === uuid) || null))
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
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

  return (
    <>
      <Box className={"flex flex-col gap-6 [&_*]:!text-black"}>
        <Box className={"flex gap-4"}>
          <SelectRoot
            items={[
              { label: "Новые", value: "desc" },
              { label: "Старые", value: "asc" },
            ]}
            value={orderBy}
            onValueChange={handleOrderByChange}
          >
            <SelectTrigger
              iconClassName={"fill-primary-main"}
              className={"border-primary-main h-full border"}
            />
            <SelectBody>
              {[
                { label: "Новые", value: "desc" },
                { label: "Старые", value: "asc" },
              ].map(({ value, label }) => (
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
      <UpdateNewsModal />
    </>
  )
}
