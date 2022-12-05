import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./Button";
import "../index.css";

const ButtonStory = {
  title: "Lovely Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    children: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof Button>;

export default ButtonStory;

const Template: ComponentStory<typeof Button> = (args: any) => (
  <Button {...args}>Login</Button>
);

export const primary = Template.bind({});
primary.args = {
  theme: "primary",
};

export const secondary = Template.bind({});
secondary.args = {
  theme: "secondary",
};
