// @vitest-environment jsdom

import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  HIFOX_NAMING_TOOL_URL,
  parseCopiedAgentName,
  pickSuggestionBatch,
} from "./agent-name-picker";
import { AgentNameField } from "./agent-configuration-panel";

vi.mock("../../i18n", () => ({
  useT: () => ({
    t: (
      selector: (translations: {
        create_dialog: { name_label: string; name_placeholder: string };
      }) => string,
    ) =>
      selector({
        create_dialog: { name_label: "名称", name_placeholder: "例如：深度研究智能体" },
      }),
  }),
}));

describe("AgentNamePicker & embedded quming.hifox.com dialog", () => {
  afterEach(cleanup);

  it("extracts a clean name from copied quming.hifox.com text", () => {
    expect(parseCopiedAgentName("甘道夫")).toBe("甘道夫");
    expect(parseCopiedAgentName("风清扬｜首席架构师\n第二行")).toBe("风清扬");
    expect(parseCopiedAgentName("  1. 太上老君 | 系统守护  ")).toBe("太上老君");
    expect(parseCopiedAgentName("   \n  ")).toBe("");
  });

  it("rotates 8 distinct name suggestions when shuffling", () => {
    const page0 = pickSuggestionBatch("featured", 0);
    const page1 = pickSuggestionBatch("featured", 1);
    expect(page0).toHaveLength(8);
    expect(page1).toHaveLength(8);
    expect(page0).not.toEqual(page1);
  });

  it("opens suggestion pills on focus, shuffles, selects a pill, and opens embedded quming.hifox.com modal", async () => {
    const onChange = vi.fn();
    render(createElement(AgentNameField, { name: "", error: null, onChange }));

    const input = screen.getByRole("textbox", { name: "名称" });
    expect(screen.queryByText("甘道夫")).not.toBeInTheDocument();

    fireEvent.focus(input);
    expect(screen.getByText("甘道夫")).toBeInTheDocument();
    expect(screen.getByText("HiFox 取名工具")).toBeInTheDocument();

    // Shuffle changes visible suggestions
    fireEvent.click(screen.getByRole("button", { name: "换一批名称" }));
    expect(screen.getByText("孙悟空")).toBeInTheDocument();

    // Clicking a pill sets the name and closes the suggestion card
    fireEvent.click(screen.getByRole("button", { name: "孙悟空" }));
    expect(onChange).toHaveBeenCalledWith("孙悟空");
    expect(screen.queryByText("HiFox 取名工具")).not.toBeInTheDocument();

    // Clicking the built-in naming tool button opens the modal with quming.hifox.com iframe
    fireEvent.click(screen.getByRole("button", { name: "打开内置取名工具" }));
    const iframe = await screen.findByTitle("HiFox Agent 取名工具");
    expect(iframe).toHaveAttribute("src", HIFOX_NAMING_TOOL_URL);

    // Entering a name in the modal footer and confirming applies it
    const pickedInput = screen.getByRole("textbox", { name: "选中的智能体名称" });
    fireEvent.change(pickedInput, { target: { value: "莱戈拉斯" } });
    fireEvent.click(screen.getByRole("button", { name: /填入「莱戈拉斯」/ }));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith("莱戈拉斯"));
  });
});
