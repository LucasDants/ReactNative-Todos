import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from './TasksList';

interface TaskItemProps {
    index: Number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const textInputRef = useRef<TextInput>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setNewTitle(task.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask(task.id, newTitle);
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop]
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        //TODO - use style prop 
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={newTitle}
                        editable={isEditing}
                        onChangeText={setNewTitle}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
                {
                    isEditing ?
                        <TouchableOpacity
                            testID={`edit-${index}`}
                            onPress={handleCancelEditing}
                        >
                            <Icon
                                name="x"
                                size={24}
                                color="#B2B2B2"
                            />
                        </TouchableOpacity> :
                        <TouchableOpacity
                            testID={`edit-${index}`}
                            onPress={handleStartEditing}
                        >
                            <Image source={editIcon} />
                        </TouchableOpacity>
                }
                <View style={styles.divider} />
                <TouchableOpacity
                    testID={`trash-${index}`}
                    disabled={isEditing}
                    style={{ opacity: isEditing ? 0.2 : 1}}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        maxWidth: '60%'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
        maxWidth: '60%'
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingRight: 12
    }
})