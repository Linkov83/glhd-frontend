import api from './index';

export const getExperiments = async () => {
  const response = await api.get('experiments/');
  return response.data;
};

export const createExperiment = async (data) => {
  const response = await api.post('experiments/', data);
  return response.data;
};
