import { useShowPropertyPane } from "utils/hooks/dragResizeHooks";
import { selectWidget } from "actions/widgetActions";
import {
  getCurrentWidgetId,
  getIsPropertyPaneVisible,
} from "selectors/propertyPaneSelectors";
import { useStore } from "react-redux";
import { AppState } from "reducers";
import { APP_MODE } from "reducers/entityReducers/appReducer";
import { getAppMode } from "selectors/applicationSelectors";
import { useCallback } from "react";

export const useClickOpenPropPane = () => {
  const store = useStore<AppState>();
  const showPropertyPane = useShowPropertyPane();
  // const isPropPaneVisible = useSelector(getIsPropertyPaneVisible);
  // const selectedWidgetId = useSelector(getCurrentWidgetId);
  // const focusedWidget = useSelector(
  //   (state: AppState) => state.ui.widgetDragResize.focusedWidget,
  // );
  // // This state tells us whether a `ResizableComponent` is resizing
  // const isResizing = useSelector(
  //   (state: AppState) => state.ui.widgetDragResize.isResizing,
  // );
  // const appMode = useSelector(getAppMode);

  // // This state tells us whether a `DraggableComponent` is dragging
  // const isDragging = useSelector(
  //   (state: AppState) => state.ui.widgetDragResize.isDragging,
  // );
  const openPropertyPane = useCallback(() => {
    const state = store.getState();

    const isResizing = state.ui.widgetDragResize.isResizing;
    const isDragging = state.ui.widgetDragResize.isDragging;
    const appMode = getAppMode(state);
    const isPropPaneVisible = getIsPropertyPaneVisible(state);
    const selectedWidgetId = getCurrentWidgetId(state);
    const focusedWidget = state.ui.widgetDragResize.focusedWidget;

    // ignore click captures if the component was resizing or dragging coz it is handled internally in draggable component
    if (isResizing || isDragging || appMode !== APP_MODE.EDIT) return;
    if (
      (!isPropPaneVisible && selectedWidgetId === focusedWidget) ||
      selectedWidgetId !== focusedWidget
    ) {
      selectWidget(focusedWidget);
      showPropertyPane(focusedWidget, undefined, true);
    }
  }, [showPropertyPane]);
  return openPropertyPane;
};
