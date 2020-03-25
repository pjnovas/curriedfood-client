import { useNavigation } from '@react-navigation/native';

export const useNavigateTo = (to) => {
  const navigation = useNavigation();
  return () => navigation.navigate(to);
};

export const useNavigateBack = () => {
  const navigation = useNavigation();
  return () => navigation.goBack();
};
