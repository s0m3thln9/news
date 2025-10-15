import { Box, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useNews } from "@/features/search-news/use-news"

export const NewsSearch = () => {
  const { searchQuery, handleSearchQueryChange } = useNews()

  return (
    <Box className="self-stretch">
      <TextField
        variant="filled"
        size="small"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className="h-full self-stretch rounded-none text-sm"
        sx={{
          width: 300,
          bgcolor: "#585858",
          "& .MuiInputBase-input": {
            transition: "all 0.3s ease",
            color: "common.white",
            padding: "16px",
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <SearchIcon fontSize="large" sx={{ color: "common.white" }} />
            ),
          },
        }}
      />
    </Box>
  )
}
