import { Modal, OrderInfo } from '@components';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailFeed = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  return (
    <Modal title={`#${number}`} onClose={() => navigate('/feed')}><OrderInfo /></Modal>
  );
};
