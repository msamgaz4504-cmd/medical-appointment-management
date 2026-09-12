-- Données fictives destinées uniquement à la démonstration
-- À exécuter après database/schema.sql dans une base vide

USE reservation_app;

-- Patient de démonstration
INSERT INTO user (nom, prenom, email, telephone, password, role)
VALUES ('Demo', 'Patient', 'patient.demo@example.com', '0600000000', '$2b$10$iNniq77Nmx9.T0Tp7quONuual0tKEWBIMkviYlxhM0UwYN0FRBf4S', 'user');

SET @demo_patient_id = LAST_INSERT_ID();

-- Administrateur de démonstration
INSERT INTO user (nom, prenom, email, telephone, password, role)
VALUES ('Demo', 'Administrateur', 'admin.demo@example.com', '0611111111', '$2b$10$NY03jPupVbXuIsqnvN0kD.cRPjrlz6vi3lMCNYS7MQxe4ZeTLKhfW', 'admin');

-- Créneau associé à un rendez-vous fictif
INSERT INTO creneau (date, heure)
VALUES (DATE_ADD(CURDATE(), INTERVAL 7 DAY), '09:00:00');

SET @demo_creneau_id = LAST_INSERT_ID();

INSERT INTO rendez_vous (user_id, creneau_id, motif, statut)
VALUES (@demo_patient_id, @demo_creneau_id, 'Consultation générale de démonstration', 'en_attente');

-- Créneau libre pour tester une nouvelle réservation
INSERT INTO creneau (date, heure)
VALUES (DATE_ADD(CURDATE(), INTERVAL 8 DAY), '10:00:00');
