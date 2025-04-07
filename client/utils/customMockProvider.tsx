import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { InMemoryCache } from "@apollo/client";

export function customMockProvider(
  mocks: MockedResponse[],
  children: React.ReactNode
) {
  const cache = new InMemoryCache({
    addTypename: false,
  });

  return (
    <MockedProvider mocks={mocks} cache={cache}>
      {children}
    </MockedProvider>
  );
}
