import { useDispatch, useSelector } from "react-redux"
import { add, remove, update, UserState, type User } from './UsersSlice'
import { RootState } from "../../app/store";
import { useState } from "react";



export const UserList = () => {
    const dispatch = useDispatch();
    const users: User[] = useSelector((state: RootState) => state.users)
    
    const [formValues, setFormValues] = useState<User>({ id: 0, nickname: '', age: 0 });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.name === 'age' ? parseInt(e.target.value): e.target.value
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            dispatch(update(formValues));
            setIsEditing(false);
        } else {
            dispatch(add({ ...formValues, id: users.length + 1 }));
        }
        setFormValues({ id: 0, nickname: '', age: 0 }); // Resetowanie formularza
    };

    const handleEdit = (user: User) => {
        setFormValues(user);
        setIsEditing(true);
    };
    return (
        <div>
            <form>
                <input 
                type="text"
                name="nickname"
                placeholder="Name"
                value={formValues.nickname}
                onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="age"
                    value={formValues.age}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>
                    {isEditing ? 'Update': 'Add'}
                </button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.nickname} - age: {user.age}
                        <button onClick={() => handleEdit(user)}>update</button>
                        <button onClick={() => dispatch(remove(user.id))}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}