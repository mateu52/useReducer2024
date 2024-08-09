import { type User} from './UsersReducer'

type UserListProps = {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
  };
  
export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
      <div>
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center mb-2">
            <p>{user.nickname} ({user.age} lat)</p>
            <div>
              <button onClick={() => onEdit(user)} className="mr-2 bg-yellow-500 px-2 py-1 rounded">Edit</button>
              <button onClick={() => onDelete(user.id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  };