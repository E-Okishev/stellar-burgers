import { IngredientDetails, Modal } from '@components';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailIngredient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (id) {
    return (
      <Modal title={`Детали ингредиента`} onClose={() => navigate('/')}>
        <IngredientDetails id={id} />
      </Modal>
    );
  }
  return null;
};
