import React from "react";
import Headline from "./Headline";

export default {
    title: "hoblinof/Headline",
    component: Headline,
}

const Template = (args) =>  <Headline {...args}/>
export const standard = Template.bind({})
standard.args ={
    size:"medium",
    text: "here is a E"
}
export const small = Template.bind({})
small.args ={
    size:"small",
    text: "here is a E"
}
export const large = Template.bind({})
large.args ={
    size:"large",
    text: "here is a E"
}