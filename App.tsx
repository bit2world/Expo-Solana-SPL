import { StatusBar } from "expo-status-bar";
import React from "react";

import "./global";

import "react-native-url-polyfill/auto";

import { NativeBaseProvider } from 'native-base';

import useCachedResources from "./hooks/useCachedResources";

import Navigation from "./navigation";
import AppProvider from "./context/AppProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <NativeBaseProvider>
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>
      </AppProvider>
    );
  }
}
