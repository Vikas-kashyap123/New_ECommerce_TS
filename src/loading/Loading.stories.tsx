import { ComponentMeta, ComponentStory } from "@storybook/react";
import Loading from "./Loading";
import "../index.css";

export default {
  title: "Loading",
  component: Loading,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args}></Loading>
);

export const small = Template.bind({});
small.args = {
  size: "small",
};
