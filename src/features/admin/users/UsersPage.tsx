"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { DeleteUserDialog } from "./DeleteUserDialog";
import { UserDetailDialog } from "./UserDetailDialog";
import { UserFormDialog } from "./UserFormDialog";
import { UserFormValues, UserItem } from "./types";
import { UsersTable } from "./UsersTable";
import {
  createUser,
  deleteUser,
  fetchUsers,
  selectUsers,
  selectUsersError,
  selectUsersStatus,
  updateUser,
} from "./store";

const mapUserToFormValues = (user: UserItem): UserFormValues => ({
  username: user.username,
  email: user.email,
  password: "",
  phone: user.phone ?? "",
  address: user.address ?? "",
  active: user.active,
  roleName: user.role?.name ?? "",
});

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedUser) {
      return mapUserToFormValues(selectedUser);
    }

    return undefined;
  }, [formMode, selectedUser]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleViewUser = (user: UserItem) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleEditUser = (user: UserItem) => {
    setFormMode("edit");
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (user: UserItem) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleUpsertUser = async (values: UserFormValues) => {
    if (formMode === "edit" && selectedUser) {
      await dispatch(
        updateUser({
          id: selectedUser.id,
          values,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createUser(values)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) {
      return;
    }

    await dispatch(deleteUser(selectedUser.id)).unwrap();
    setSelectedUser(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                User Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage user profiles, contact details, activation status, and
                roles.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>

          <UsersTable
            users={users}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading users from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <UserFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertUser}
          />

          <UserDetailDialog
            open={isDetailOpen}
            user={selectedUser}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteUserDialog
            open={isDeleteOpen}
            user={selectedUser}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
