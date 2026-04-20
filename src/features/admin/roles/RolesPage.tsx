"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Header, Sidebar } from "@/src/features/admin/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { defaultRoleFormValues, initialRoles } from "./data";
import { DeleteRoleDialog } from "./DeleteRoleDialog";
import { RoleDetailDialog } from "./RoleDetailDialog";
import { RoleFormDialog } from "./RoleFormDialog";
import { RolesTable } from "./RolesTable";
import {
  createRole,
  deleteRole,
  fetchPermissions,
  fetchRoles,
  selectPermissions,
  selectPermissionsStatus,
  selectRoles,
  selectRolesError,
  selectRolesStatus,
  updateRole,
} from "./store";
import type { RoleFormValues, RoleItem } from "./types";

const mapRoleToFormValues = (role: RoleItem): RoleFormValues => ({
  name: role.name,
  description: role.description ?? "",
  permissionIds:
    role.permissionIds ??
    role.permissions?.map((permission) => permission.id) ??
    [],
});

export const RolesPage = () => {
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectRoles);
  const status = useAppSelector(selectRolesStatus);
  const permissions = useAppSelector(selectPermissions);
  const permissionsStatus = useAppSelector(selectPermissionsStatus);
  const error = useAppSelector(selectRolesError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchRoles());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (permissionsStatus === "idle") {
      void dispatch(fetchPermissions());
    }
  }, [dispatch, permissionsStatus]);

  const formInitialValues = useMemo(() => {
    if (formMode === "edit" && selectedRole) {
      return mapRoleToFormValues(selectedRole);
    }

    return defaultRoleFormValues;
  }, [formMode, selectedRole]);

  const handleOpenCreateForm = () => {
    setFormMode("create");
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleViewRole = (role: RoleItem) => {
    setSelectedRole(role);
    setIsDetailOpen(true);
  };

  const handleEditRole = (role: RoleItem) => {
    setFormMode("edit");
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (role: RoleItem) => {
    setSelectedRole(role);
    setIsDeleteOpen(true);
  };

  const handleUpsertRole = async (values: RoleFormValues) => {
    const payload = {
      name: values.name.trim(),
      description: values.description.trim() || undefined,
      permissionIds: values.permissionIds,
    };

    if (formMode === "edit" && selectedRole) {
      await dispatch(
        updateRole({
          id: selectedRole.id,
          values: payload,
        }),
      ).unwrap();
      return;
    }

    await dispatch(createRole(payload)).unwrap();
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole) {
      return;
    }

    await dispatch(deleteRole(selectedRole.id)).unwrap();
    setSelectedRole(null);
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
                Role Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage access roles and assign permissions from API.
              </p>
            </div>
            <Button
              variant="default"
              className="gap-2"
              onClick={handleOpenCreateForm}
            >
              <Plus className="w-4 h-4" />
              Add Role
            </Button>
          </div>

          <RolesTable
            roles={roles.length > 0 ? roles : initialRoles}
            onView={handleViewRole}
            onEdit={handleEditRole}
            onDelete={handleDeletePrompt}
          />

          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Loading roles from API...
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <RoleFormDialog
            mode={formMode}
            open={isFormOpen}
            initialValues={formInitialValues}
            permissions={permissions}
            permissionsStatus={permissionsStatus}
            onOpenChange={setIsFormOpen}
            onSubmit={handleUpsertRole}
          />

          <RoleDetailDialog
            open={isDetailOpen}
            role={selectedRole}
            permissions={permissions}
            onOpenChange={setIsDetailOpen}
          />

          <DeleteRoleDialog
            open={isDeleteOpen}
            role={selectedRole}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};
