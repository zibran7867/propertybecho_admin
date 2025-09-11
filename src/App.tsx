import { HeroUIProvider } from "@heroui/react";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import Spinner from "./layout/Spinner";
import AppRouting from "./routes/AppRouting";
import store from "./store/store";

function App() {

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Toaster position="top-right" />
        <HeroUIProvider>
          <AppRouting />
        </HeroUIProvider>
      </Suspense>
    </Provider>
  )
}

export default App
