import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface ResponseBody {
  id: string;
  name: string;
  logoUrl: string;
}

function useOrganizationInfo() {
  const [data, setData] = useState<ResponseBody | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | AxiosError>(null);

  useEffect(() => {
    axios
      .get<ResponseBody>('/api/organization-info')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
    error,
  };
}

export default useOrganizationInfo;
