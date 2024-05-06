import Link from "next/link";

interface FormProps {
  type: string;
  post: { title: string; description: string; isImportant: boolean; };
  setPost: React.Dispatch<
    React.SetStateAction<{ title: string; description: string; isImportant: boolean }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(FormProps: FormProps) {
  return <div className="mx-auto flex flex-col max-w-screen-sm h-auto">
    <h1 className="text-3xl font-bold text-center mb-5">{FormProps.type} Todo</h1>
    <form onSubmit={FormProps.handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-lg font-semibold">Title</label>
        <input
          type="text"
          id="title"
          value={FormProps.post.title}
          onChange={(e) => FormProps.setPost({ ...FormProps.post, title: e.target.value })}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg font-semibold">Description</label>
        <textarea
          id="description"
          value={FormProps.post.description}
          onChange={(e) => FormProps.setPost({ ...FormProps.post, description: e.target.value })}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="isImportant" className="text-lg font-semibold">Important</label>
        <input
          type="checkbox"
          id="isImportant"
          checked={FormProps.post.isImportant}
          onChange={(e) => FormProps.setPost({ ...FormProps.post, isImportant: e.target.checked })}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button type="submit" disabled={FormProps.submitting} className="bg-blue-500 text-white p-2 rounded-md"> {FormProps.submitting ? `${FormProps.type}...`: FormProps.type}</button>
    </form>
    <Link href="/">
      <button className="text-blue-500 text-center">Back to Todos</button>
    </Link>
  </div>;
}
