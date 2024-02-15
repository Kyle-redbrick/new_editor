import React, { useState } from "react";
import View from "./View";

export default function Container() {
  const [menuIndex, setMenuIndex] = useState(0);
  return <View menuIndex={menuIndex} setMenuIndex={setMenuIndex} />;
}
