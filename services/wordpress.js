import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {jwtDecode} from "jwt-decode";

class WordPressService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Quitar la barra final si existe
    this.token = null;
    this.userID = null;
  }

  async initialize() {
        try { 
          const storedToken = await AsyncStorage.getItem('wp_token'); 
          if(storedToken){
            this.token = storedToken; 
            const storedUserID = await this.getCurrentUser()
            if(storedUserID){
              this.userID = storedUserID.id
            }
          }
        } catch (error) { 
          console.error('Error loading token:', error); 
        }   
  }

  async login(username, password) {
    try { 
      const response = await fetch(`${this.baseUrl}/wp-json/jwt-auth/v1/token`, 
        { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify({ username, password }), 
        }); if (!response.ok) { 
          throw new Error('Login failed'); 
        } 
        const data = await response.json(); 
        this.token = data.token; 
        await AsyncStorage.setItem('wp_token', data.token); 
        return data; 
      } catch (error) { 
        console.error('Login error:', error);
        throw error;
      }
  }

  async logout() {
    this.token = null;
    await AsyncStorage.removeItem('wp_token');
  }

  async getCurrentUser() {
    if (!this.token) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/wp-json/careme/v1/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        await AsyncStorage.removeItem('wp_token');
        this.token = null
        throw new Error('Failed to fetch user');
      }
      const user = await response.json();
      this.userID = user.id;
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getUsers() {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/users`);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/users/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getPosts(page = 1, perPage = 10) {
    try {
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async applicationBenefit(id, name, ciudad, telefono, identificacion, procedimiento){
    try {
      const response = await fetch(`${this.baseUrl}/wp-content/plugins/GiftCare/api/messageWhatsapp.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ciudad, // Aquí puedes pasar la ciudad seleccionada
          telefono,
          nombre: name,
          procedimiento,
          identificacion,
        }),
      })
      const data = await response.json()
      if (data.status === "success"){
        return data.status
      } else {
        return data.status
      }
    } catch (error){
      console.error(error)
    }
  }

  async getmembership(nameMembresia){
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/careme/v1/benefits/?membership=${nameMembresia}`,{
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok ) {
        throw new Error('failed to fetch membership');
      }
      const membership = await response.json();
      return membership;
    } catch (error){
      console.error('Error fetching membership:', error);
    }
  }

  isAuthenticated() {
    return this.token !== null;
  }

  async getBenefitsData(nameBenefit) {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/careme/v1/benefits/?membership=${nameBenefit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const benefit = await response.json();
      return benefit;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async updateUserData(userId, data){
    try {
      const response = await fetch(`/wp-json/wp/v2/users/${userId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: data
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error update user:', error);
      return null;
    }

    }

  async getLastReport(){
    try {
      const res = await fetch(
        `${this.baseUrl}/wp-json/facecheck/v1/ultimo-informe?identificacion=${this.userID}`,
        {
          headers: {
            "Authorization": `Bearer ${this.token}`,
          }, 
        }
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "No se encontró informe");
      }
      return data
    } catch (err) {
      console.log("Error ❌", err.message || "No se pudo cargar el informe");
    }
  }

  async uploadImage(photo){
    const formData = new FormData();
    formData.append("file", {
      uri: photo.uri,
      type: "image/jpeg",
      name: `${this.userID}-${Date.now()}.jpg`, // 👈 nombre válido
    });
    try{
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/media`,{
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.token}`,
        },
        body: formData
      })
      if(!response.ok){
        const errorData = await response.json();
        console.error("Error WP media:", errorData.message || errorData);
        throw new Error(errorData.message || "Error subiendo la imagen");
      }
      const data = await response.json();
      return data.id
    } catch {
      console.log("Error ❌", err.message || "No se pudo cargar la imagen");
    }
  }

  async createReport(diagnostico, procedimientos, imageID ) {
      try {
        const wpResponse = await fetch(`${this.baseUrl}/wp-json/facecheck/v1/analisis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`, // 🔑 JWT o token de WP
          },
          body: JSON.stringify({
            diagnostico, // 👈 puedes enviarlo como objeto
            procedimientos, // 👈 array directo
            identificacion: this.userID, // mejor usar el de tu contexto
            imagen_id: imageID
          }),
        });

        if (!wpResponse.ok) {
          throw new Error("Error creando el post en WordPress");
        }
        const wpData = await wpResponse.json();
        Alert.alert("Éxito ✅", `Post creado con ID ${wpData.post_id}`);
      } catch (err) {
        console.error("Erroreee:", err);
        Alert.alert("Error ❌", err.message || "Ocurrió un error");
      }
  };

  async getProductsColombia() {
    try {
      const res = await fetch(
        "https://careme360.com/wp-json/careme/v1/products-careme"
      )
      const data = await res.json();
      if(!data) {
        throw new Error(data.message || "No se pudo taer los productos")
      }
      return data
    } catch (err) {
      console.error("Error: ", err.message || "No se pudo encontrar");
    }
  }

  async getCitasUser(id) {
    try {
      const res = await fetch(
        `${this.baseUrl}/wp-json/careme/v1/citas?user_id=${id}`,
        {
          headers: {
            "Authorization": `Bearer ${this.token}`,
          },
        }
      );
      const data = await res.json();
      if(!data) {
        throw new Error("Error: ",data.message || "No se pudo traer las citas")
      }
      return data
    } catch (err) {
      console.error("Error: ", err.message || "No se pudo encontrar");
    }
  }
}

// Crear instancia singleton (ajusta la URL según tu entorno)
const wpService = new WordPressService('https://c699d7206b68.ngrok-free.app');

export default wpService;