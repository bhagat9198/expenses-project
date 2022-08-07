import { Box, NativeBaseProvider, Text } from "native-base";
import Home from "./views/Home";


export default function App() {
  return (
    <NativeBaseProvider>
      <Box safeArea >
        <Home />
      </Box>
    </NativeBaseProvider>
  );
}

