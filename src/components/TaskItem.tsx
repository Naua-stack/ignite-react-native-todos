import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import trashIcon from "../assets/icons/trash/trash.png";
import pencilIcon from "../assets/icons/pencil/pencil.png";
import removeIcon from "../assets/icons/remove/X.png";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => boolean;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput | null>(null);

  function handleEditTask() {
    const edited = editTask(task.id, newTaskTitle)
    if(!edited){
      setNewTaskTitle(task.title)
    }
    setIsEditing(false)
  }

  function handleCancelEditingTask(){
      setNewTaskTitle(task.title);
      setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={newTaskTitle}
            onChangeText={(text) => setNewTaskTitle(text)}
            onSubmitEditing={handleEditTask}
            editable={isEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`remove-${index}`}
            onPress={handleCancelEditingTask}
            style={{ marginRight: 18, justifyContent: "center" }}
          >
            <Image source={removeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`pencil-${index}`}
            style={{ marginRight: 12 }}
            onPress={() => setIsEditing(true)}
          >
            <Image source={pencilIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.separator}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{ marginLeft: 12, marginRight: 20, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,

    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  separator: {
    width: 1,
    backgroundColor: "#C4C4C4",
  },
});
