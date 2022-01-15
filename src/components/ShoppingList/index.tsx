import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

import { shoppingListExample } from "../../utils/shopping.list.data";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>(shoppingListExample);

  useEffect(() => {
    function bootstrap() {
      firestore()
        .collection("products")
        .onSnapshot((items) => {
          const data = items.docs.map((documents) => {
            return {
              id: documents.id,
              ...documents.data(),
            };
          }) as ProductProps[];

          setProducts(data);
        });
    }

    bootstrap();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
