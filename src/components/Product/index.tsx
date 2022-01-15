import React from "react";
import firestore from "@react-native-firebase/firestore";
import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";
import { Alert } from "react-native";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  function handleDoneTogle() {
    try {
      firestore().collection("products").doc(data.id).update({
        done: !data.done,
      });
    } catch (err) {
      Alert.alert("Nāo foi possível alterar o estado");
    }
  }

  function handleDeleteProduct() {
    try {
      firestore().collection("products").doc(data.id).delete();
    } catch (err) {
      Alert.alert("Nāo foi possível deletar o produto");
    }
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneTogle}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  );
}
