import { create, tsx } from "@dojo/framework/core/vdom";
import Avatar from "@dojo/widgets/avatar";
import Card from "@dojo/widgets/card";
import Label from "@dojo/widgets/label";

// import Link from '@dojo/framework/routing/Link';
import { ActiveLink } from "@dojo/framework/routing/ActiveLink";

import { Drink } from "../interfaces";

import * as css from "./styles/DrinkCard.m.css";

const factory = create().properties<Drink>();

export default factory(function DrinkCard({ properties }) {
  const { id, name = "Coffee", price, imageUrl: image } = properties();

  return (
    <div classes={[css.root]}>
      <Card title={name}>
        {{
          content: (
            <div
              classes={[css.content]}
            >
              <Avatar variant="circle" size="large" src={image}></Avatar>
              <Label>${price.toFixed(2)}</Label>
            </div>
          ),
          actionButtons: (
            <ActiveLink
              activeClasses={["link-active"]}
              to="drink"
              params={{
                id: `${String(id)}`,
              }}
            >
              Add
            </ActiveLink>
          ),
        }}
      </Card>
    </div>
  );
});
