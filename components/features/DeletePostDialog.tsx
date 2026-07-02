"use client";

import { AlertTriangle } from "lucide-react";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeletePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  postTitle: string;
}

export const DeletePostDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  postTitle,
}: DeletePostDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Delete post
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Are you sure you want to delete{" "}
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            &ldquo;{postTitle}&rdquo;
          </span>
          ? This action cannot be undone.
        </p>
        <div className="mt-6 flex w-full gap-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            fullWidth
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
