import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "./UsersReducer";
import { z } from "zod";

const userSchema = z.object({
    nickname: z.string().min(1, "Nickname is required"),
    age: z.preprocess(
        (val) => (typeof val === 'string' ? parseInt(val, 10) : val), // Konwersja z string na number
        z.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100")
    ),
});

type UserFormProps = {
    onSubmit: (user: User) => void;
    editUser: User | null;
};

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, editUser }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: editUser || { nickname: '', age: 18 }
        });
    
        useEffect(() => {
        reset(editUser || { nickname: '', age: 18 });
        }, [editUser, reset]);
    
        const submitHandler = (data: any) => {
        const user = {
            id: editUser ? editUser.id : Math.random(),
            nickname: data.nickname,
            age: Number(data.age),
        };
        onSubmit(user);
        };
    
    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
            <div>
            <input {...register('nickname')} placeholder="Nickname" className="border rounded p-2 mb-2" />
            {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}
            </div>
            <div>
            <input {...register('age')} type="number" placeholder="Age" className="border rounded p-2 mb-2" />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editUser ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
  };