package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	f, _ := os.OpenFile("log.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	logger := log.New(f, "", log.LstdFlags)

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			logger.Printf("Request: %s %s", r.Method, r.URL.Path)
			http.FileServer(http.Dir("./")).ServeHTTP(w, r)
		},
	)

	srv := &http.Server{Addr: ":8080", Handler: handler}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go srv.ListenAndServe()
	log.Println("Server running.")

	<-stop

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	srv.Shutdown(ctx)
	
	f.Sync()
	f.Close()
	log.Println("Server and Log closed.")
}
