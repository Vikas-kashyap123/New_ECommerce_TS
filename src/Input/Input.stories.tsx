import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "./Input";
import "../index.css";

export default {
  title: "Input",
  component: Input,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    border: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary"],
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);

export const size = Template.bind({});
size.args = {
  size: "small",
  border: "primary",
};
export const border = Template.bind({});
border.args = {
  size: "large",
  border: "tertiary",
};
