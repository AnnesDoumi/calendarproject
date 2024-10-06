<template>
  <div class="image-upload">
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <button v-if="selectedImage" @click="uploadImage">Bild hochladen</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedImage = event.target.files[0];
    },
    uploadImage() {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
          .then(response => {
            if (!response.ok) throw new Error('Upload failed');
            return response.json();
          })
          .then(() => {
            alert('Bild erfolgreich hochgeladen!');
          })
          .catch(error => {
            console.error('Fehler beim Hochladen:', error);
            alert('Fehler beim Hochladen des Bildes: ' + error.message);
          });

    }

  }
}
</script>

<style scoped>
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
button {
  margin-top: 10px;
}
</style>
