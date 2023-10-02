import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LaneForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [previewSrc, setPreviewSrc] = useState('');
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4001/lanes/${id}`)
        .then(response => response.json())
        .then(data => setFormData(data.lane))
        .catch(error => {
          console.error('Error fetching memory:', error);
          navigate('/');  // Redirect to home page on error
        });
    }
  }, [id, history]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'image') {
      setPreviewSrc(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      ...formData,
    };

    const url = id ? `http://127.0.0.1:4001/lanes/${id}` : 'http://127.0.0.1:4001/lanes';
    console.log(url)
    console.log(payload)
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = `Failed to ${id ? 'update' : 'create'} memory: ${response.statusText}`;
        console.error(errorMessage);
      } else {
        console.log('Memory', id ? 'updated' : 'created', 'successfully!');
        if (!id) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }; return (
    <div>
      <h1 className="my-8 text-4xl"> Creating lane </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {previewSrc && (
          <div className="mt-4">
            <img src={previewSrc} alt="Preview" className="w-40 h-40 object-cover" />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LaneForm;

