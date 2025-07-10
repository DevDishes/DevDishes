# DevDishes - Modern Architecture

## Structure
- `frontend/`: React or SPA frontend (to be added)
- `backend/`: Flask API for recipes
- `db/`: SQLite database (Kubernetes managed)

## How to Use

### Frontend
- Place your frontend code in the `frontend/` folder.
- Build Docker image:
  ```sh
  docker build -t frontend:latest ./frontend
  ```
- Deploy to Kubernetes:
  ```sh
  kubectl apply -f frontend/deployment.yaml
  ```

### Backend
- Flask app receives recipes as JSON and stores them in SQLite.
- Build Docker image:
  ```sh
  docker build -t backend:latest ./backend
  ```
- Deploy to Kubernetes:
  ```sh
  kubectl apply -f backend/deployment.yaml
  ```

### Database
- SQLite runs in a container with a persistent volume.
- Deploy to Kubernetes:
  ```sh
  kubectl apply -f db/deployment.yaml
  ```

## Notes
- The backend and db services are internal (ClusterIP), frontend is exposed via LoadBalancer.
- Make sure to update image names/tags as needed for your registry. 