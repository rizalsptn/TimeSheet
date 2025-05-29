const viewTask = async (id: number) => {
    try {
      // Fetch task data dari API
      const response = await fetch(`https://localhost:3001/tasks/${id}`);
      const taskData = await response.json();
  
      // Tampilkan task data dalam modal atau halaman baru
      const modal = document.getElementById('task-modal');
      if (modal) {
        modal.innerHTML = `
          <h2>${taskData.title}</h2>
          <p>${taskData.description}</p>
          <p>Created at: ${taskData.createdAt}</p>
          <p>Updated at: ${taskData.updatedAt}</p>
        `;
        modal.classList.add('show');
      } else {
        // Redirect ke halaman task detail
        window.location.href = `/tasks/${id}`;
      }
    } catch (error) {
      console.error(error);
      // Tampilkan error message
      alert('Gagal menampilkan task');
    }
  };