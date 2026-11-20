import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from './AuthContext';

// New students start with no subjects. Each student adds their own.
const DEFAULT_SUBJECTS = [];

const TasksContext = createContext(null);

// Keeps the student's tasks and subjects, and saves them on the phone.
// Each student number has its own saved data.
export function TasksProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? `data:${user.studentNumber}` : null;

  const [tasks, setTasks] = useState([]); // all saved tasks
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS); // subject choices
  const [loadedKey, setLoadedKey] = useState(null); // which student's data is in memory

  // Loads the saved data whenever the student changes.
  useEffect(() => {
    let active = true;

    setTasks([]);
    setSubjects(DEFAULT_SUBJECTS);
    setLoadedKey(null);

    if (!storageKey) {
      return undefined;
    }

    AsyncStorage.getItem(storageKey)
      .then((raw) => {
        if (!active) {
          return;
        }
        const saved = raw ? JSON.parse(raw) : null;
        setTasks(saved?.tasks ?? []);
        setSubjects(saved?.subjects ?? DEFAULT_SUBJECTS);
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setLoadedKey(storageKey);
        }
      });

    return () => {
      active = false;
    };
  }, [storageKey]);

  // Saves the data every time it changes (only after it has been loaded).
  useEffect(() => {
    if (!storageKey || loadedKey !== storageKey) {
      return;
    }
    AsyncStorage.setItem(storageKey, JSON.stringify({ tasks, subjects })).catch(() => {});
  }, [tasks, subjects, storageKey, loadedKey]);

  // Adds a new task. It starts as Pending.
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [...current, newTask]);
  };

  // Changes some fields of one task.
  const updateTask = (id, changes) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...changes } : task))
    );
  };

  // Removes one task.
  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // Changes the status of many tasks at once. statusById looks like { id: 'Completed' }.
  const setStatuses = (statusById) => {
    setTasks((current) =>
      current.map((task) =>
        statusById[task.id] ? { ...task, status: statusById[task.id] } : task
      )
    );
  };

  // Adds a new subject and returns its name (or the existing one if it is a duplicate).
  const addSubject = (name) => {
    const clean = name.trim();
    if (!clean) {
      return null;
    }
    const existing = subjects.find((subject) => subject.toLowerCase() === clean.toLowerCase());
    if (existing) {
      return existing;
    }
    setSubjects((current) => [...current, clean]);
    return clean;
  };

  // Renames a subject in the list AND on every task that uses it.
  // Returns { ok: true } or { ok: false, error: '...' }.
  const renameSubject = (oldName, newName) => {
    const clean = newName.trim();
    if (!clean) {
      return { ok: false, error: 'Please type a subject name.' };
    }

    const duplicate = subjects.some(
      (subject) => subject !== oldName && subject.toLowerCase() === clean.toLowerCase()
    );
    if (duplicate) {
      return { ok: false, error: 'You already have a subject with that name.' };
    }

    setSubjects((current) => current.map((subject) => (subject === oldName ? clean : subject)));
    setTasks((current) =>
      current.map((task) => (task.subject === oldName ? { ...task, subject: clean } : task))
    );
    return { ok: true };
  };

  // Removes a subject from the list. Tasks that already use it keep it.
  const removeSubject = (name) => {
    setSubjects((current) => current.filter((subject) => subject !== name));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        subjects,
        addTask,
        updateTask,
        deleteTask,
        setStatuses,
        addSubject,
        renameSubject,
        removeSubject,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

// Use inside any screen: const { tasks, addTask } = useTasks();
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used inside <TasksProvider>');
  }
  return context;
}