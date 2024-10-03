import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector } from '../../services/store/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';
import { useIngredients } from '../../services/hooks/useIngredients';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<TOrder>();
  const { number } = useParams();

  const getOrderData = async () => {
    try {
      if (number) {
        const response = await getOrderByNumberApi(+number);
        setOrderData(response.orders[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);
  useIngredients();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
