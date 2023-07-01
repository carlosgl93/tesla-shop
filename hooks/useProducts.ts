import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    error: error,
  };
};

export default useProducts;
