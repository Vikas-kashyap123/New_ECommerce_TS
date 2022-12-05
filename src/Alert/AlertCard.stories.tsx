import { ComponentMeta, ComponentStory } from "@storybook/react";
import AlertCard from "./AlertCard";
import "../index.css";

export default {
  title: "AlertCart",
  component: AlertCard,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["success", "error"],
    },
  },
} as ComponentMeta<typeof AlertCard>;

const Template: ComponentStory<typeof AlertCard> = (args: any) => (
  <AlertCard {...args}></AlertCard>
);

export const success = Template.bind({});
success.args = {
  themeMap: "success",
};
