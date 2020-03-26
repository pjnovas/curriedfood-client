import { useNavigation } from '@react-navigation/native';

export const useNavigateTo = (to) => {
  const navigation = useNavigation();
  return (args) => navigation.navigate(to, args);
};

export const useNavigateBack = () => {
  const navigation = useNavigation();
  return () => navigation.goBack();
};
