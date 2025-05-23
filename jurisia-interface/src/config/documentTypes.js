export const documentTypes = {
  contrats_actes: {
    label: "Contrats et actes",
    options: {
      contrats_standards: {
        label: "Modèles de contrats standards",
        types: {
          nda: {
            label: "NDA",
            fields: [
              { id: "parties", label: "Parties", type: "text", required: true },
              { id: "duree", label: "Durée", type: "text", required: true },
              { id: "duree_post_contractuelle", label: "Durée post-contractuelle", type: "text", required: true },
              { id: "objet", label: "Objet", type: "textarea", required: true },
              { id: "obligations", label: "Obligations", type: "textarea", required: true },
              { id: "exceptions", label: "Exceptions à la confidentialité", type: "textarea", required: false },
              { id: "juridiction", label: "Juridiction compétente", type: "text", required: true }
            ]
          },
          contrat_prestation: {
            label: "Contrat de prestation",
            fields: [
              { id: "prestataire", label: "Prestataire", type: "text", required: true },
              { id: "client", label: "Client", type: "text", required: true },
              { id: "siren_prestataire", label: "N° SIREN du prestataire", type: "text", required: true },
              { id: "siren_client", label: "N° SIREN du client", type: "text", required: true },
              { id: "rcs_prestataire", label: "N° RCS et ville d'immatriculation (prestataire)", type: "text", required: true },
              { id: "rcs_client", label: "N° RCS et ville d'immatriculation (client)", type: "text", required: true },
              { id: "capital_prestataire", label: "Capital social (prestataire)", type: "text", required: true },
              { id: "siege_prestataire", label: "Siège social (prestataire)", type: "text", required: true },
              { id: "siege_client", label: "Siège social (client)", type: "text", required: true },
              { id: "representant_prestataire", label: "Représentant légal (prestataire)", type: "text", required: true },
              { id: "representant_client", label: "Représentant légal (client)", type: "text", required: true },
              { id: "services", label: "Services", type: "textarea", required: true },
              { id: "duree", label: "Durée", type: "text", required: true },
              { id: "date_debut", label: "Date de début", type: "text", required: true },
              { id: "remuneration", label: "Rémunération", type: "text", required: true },
              { id: "modalites_paiement", label: "Modalités de paiement", type: "text", required: true },
              { id: "propriete_intellectuelle", label: "Propriété intellectuelle", type: "textarea", required: true },
              { id: "conditions_resiliation", label: "Conditions de résiliation", type: "textarea", required: true },
              { id: "penalites_retard", label: "Pénalités de retard", type: "text", required: false },
              { id: "juridiction", label: "Juridiction compétente", type: "text", required: true },
              { id: "lieu_signature", label: "Lieu de signature", type: "text", required: true },
              { id: "nombre_exemplaires", label: "Nombre d'exemplaires originaux", type: "text", required: true, defaultValue: "2" }
            ]
          },
          contrat_travail: {
            label: "Contrat de travail",
            fields: [
              { id: "employeur", label: "Employeur", type: "text", required: true },
              { id: "employe", label: "Employé", type: "text", required: true },
              { id: "siren_employeur", label: "N° SIREN de l'employeur", type: "text", required: true },
              { id: "rcs_employeur", label: "N° RCS et ville d'immatriculation", type: "text", required: true },
              { id: "capital_employeur", label: "Capital social", type: "text", required: true },
              { id: "siege_employeur", label: "Siège social", type: "text", required: true },
              { id: "representant_employeur", label: "Représentant légal", type: "text", required: true },
              { id: "poste", label: "Poste", type: "text", required: true },
              { id: "convention_collective", label: "Convention collective applicable", type: "text", required: true },
              { id: "salaire", label: "Salaire", type: "text", required: true },
              { id: "date_debut", label: "Date de début", type: "text", required: true },
              { id: "periode_essai", label: "Période d'essai", type: "text", required: true },
              { id: "duree_travail", label: "Durée du travail", type: "text", required: true },
              { id: "lieu_travail", label: "Lieu de travail", type: "text", required: true },
              { id: "avantages", label: "Avantages sociaux", type: "textarea", required: false },
              { id: "lieu_signature", label: "Lieu de signature", type: "text", required: true }
            ]
          },
          bail: {
            label: "Bail",
            fields: [
              { id: "bailleur", label: "Bailleur", type: "text", required: true },
              { id: "locataire", label: "Locataire", type: "text", required: true },
              { id: "bien", label: "Description du bien", type: "textarea", required: true },
              { id: "adresse_bien", label: "Adresse complète du bien", type: "text", required: true },
              { id: "surface_habitable", label: "Surface habitable (Loi Carrez)", type: "text", required: true },
              { id: "dpe_reference", label: "Référence DPE", type: "text", required: true },
              { id: "dpe_classe", label: "Classe énergétique", type: "text", required: true },
              { id: "loyer", label: "Loyer", type: "text", required: true },
              { id: "charges", label: "Charges et conditions", type: "textarea", required: true },
              { id: "depot_garantie", label: "Montant du dépôt de garantie", type: "text", required: true },
              { id: "duree", label: "Durée", type: "text", required: true },
              { id: "date_debut", label: "Date de prise d'effet", type: "text", required: true },
              { id: "indexation", label: "Type d'indexation", type: "text", required: true },
              { id: "indice_reference", label: "Indice de référence", type: "text", required: true },
              { id: "periodicite_revision", label: "Périodicité de révision", type: "text", required: true },
              { id: "assurance_numero", label: "N° de police d'assurance", type: "text", required: true },
              { id: "assurance_compagnie", label: "Compagnie d'assurance", type: "text", required: true },
              { id: "garanties", label: "Garanties", type: "textarea", required: true },
              { id: "etat_lieux", label: "Date de l'état des lieux", type: "text", required: true },
              { id: "lieu_signature", label: "Lieu de signature", type: "text", required: true }
            ]
          },
          cgv_cgu: {
            label: "CGV/CGU",
            fields: [
              { id: "societe", label: "Société", type: "text", required: true },
              { id: "services", label: "Services concernés", type: "textarea", required: true },
              { id: "conditions", label: "Conditions générales", type: "textarea", required: true },
              { id: "paiement", label: "Conditions de paiement", type: "textarea", required: true }
            ]
          }
        }
      },
      clauses_types: {
        label: "Clauses types",
        types: {
          limitation_responsabilite: {
            label: "Limitation de responsabilité",
            fields: [
              { id: "parties", label: "Parties concernées", type: "text", required: true },
              { id: "limitations", label: "Limitations", type: "textarea", required: true },
              { id: "exclusions", label: "Exclusions", type: "textarea", required: true }
            ]
          },
          force_majeure: {
            label: "Force majeure",
            fields: [
              { id: "definition", label: "Définition", type: "textarea", required: true },
              { id: "consequences", label: "Conséquences", type: "textarea", required: true },
              { id: "notification", label: "Procédure de notification", type: "textarea", required: true }
            ]
          },
          confidentialite: {
            label: "Confidentialité",
            fields: [
              { id: "parties", label: "Parties concernées", type: "text", required: true },
              { id: "informations", label: "Informations confidentielles", type: "textarea", required: true },
              { id: "duree", label: "Durée", type: "text", required: true },
              { id: "obligations", label: "Obligations", type: "textarea", required: true }
            ]
          },
          droit_applicable: {
            label: "Droit applicable",
            fields: [
              { id: "juridiction", label: "Juridiction compétente", type: "text", required: true },
              { id: "loi", label: "Loi applicable", type: "text", required: true }
            ]
          },
          resolution_litiges: {
            label: "Résolution des litiges",
            fields: [
              { id: "procedure", label: "Procédure", type: "textarea", required: true },
              { id: "mediation", label: "Médiation", type: "textarea", required: true },
              { id: "tribunal", label: "Tribunal compétent", type: "text", required: true }
            ]
          }
        }
      },
      contrats_specifiques: {
        label: "Contrats spécifiques",
        types: {
          ma: {
            label: "M&A",
            fields: [
              { id: "parties", label: "Parties", type: "text", required: true },
              { id: "objet", label: "Objet de la transaction", type: "textarea", required: true },
              { id: "prix", label: "Prix", type: "text", required: true },
              { id: "conditions", label: "Conditions", type: "textarea", required: true },
              { id: "garanties_actif", label: "Garanties d'actif", type: "textarea", required: true },
              { id: "garanties_passif", label: "Garanties de passif", type: "textarea", required: true },
              { id: "conditions_suspensives", label: "Conditions suspensives", type: "textarea", required: true },
              { id: "declarations_vendeur", label: "Déclarations du vendeur", type: "textarea", required: true }
            ]
          },
          financement: {
            label: "Financement",
            fields: [
              { id: "preteur", label: "Prêteur", type: "text", required: true },
              { id: "emprunteur", label: "Emprunteur", type: "text", required: true },
              { id: "montant", label: "Montant", type: "text", required: true },
              { id: "conditions", label: "Conditions", type: "textarea", required: true }
            ]
          },
          it: {
            label: "IT",
            fields: [
              { id: "fournisseur", label: "Fournisseur", type: "text", required: true },
              { id: "client", label: "Client", type: "text", required: true },
              { id: "services", label: "Services IT", type: "textarea", required: true },
              { id: "sla", label: "SLA", type: "textarea", required: true }
            ]
          },
          ip: {
            label: "IP",
            fields: [
              { id: "titulaire", label: "Titulaire des droits", type: "text", required: true },
              { id: "droits", label: "Droits concernés", type: "textarea", required: true },
              { id: "utilisation", label: "Conditions d'utilisation", type: "textarea", required: true }
            ]
          },
          immobilier: {
            label: "Immobilier",
            fields: [
              { id: "vendeur", label: "Vendeur", type: "text", required: true },
              { id: "acheteur", label: "Acheteur", type: "text", required: true },
              { id: "bien", label: "Description du bien", type: "textarea", required: true },
              { id: "prix", label: "Prix", type: "text", required: true }
            ]
          }
        }
      },
      actes_juridiques: {
        label: "Actes juridiques",
        types: {
          cession_parts: {
            label: "Cessions de parts",
            fields: [
              { id: "cedant", label: "Cédant", type: "text", required: true },
              { id: "cessionnaire", label: "Cessionnaire", type: "text", required: true },
              { id: "parts", label: "Parts cédées", type: "textarea", required: true },
              { id: "prix", label: "Prix de cession", type: "text", required: true }
            ]
          },
          pv_ag: {
            label: "PV d'AG",
            fields: [
              { id: "societe", label: "Société", type: "text", required: true },
              { id: "date", label: "Date", type: "text", required: true },
              { id: "ordre_jour", label: "Ordre du jour", type: "textarea", required: true },
              { id: "decisions", label: "Décisions", type: "textarea", required: true }
            ]
          },
          statuts: {
            label: "Statuts",
            fields: [
              { id: "societe", label: "Société", type: "text", required: true },
              { id: "forme", label: "Forme juridique", type: "text", required: true },
              { id: "capital", label: "Capital", type: "text", required: true },
              { id: "objet", label: "Objet social", type: "textarea", required: true }
            ]
          },
          delegation_pouvoirs: {
            label: "Délégations de pouvoirs",
            fields: [
              { id: "delegant", label: "Délégant", type: "text", required: true },
              { id: "delegataire", label: "Délégataire", type: "text", required: true },
              { id: "pouvoirs", label: "Pouvoirs délégués", type: "textarea", required: true },
              { id: "duree", label: "Durée", type: "text", required: true }
            ]
          }
        }
      }
    }
  },
  contentieux_arbitrage: {
    label: "Contentieux et arbitrage",
    options: {
      procedures: {
        label: "Assignations, requêtes, conclusions, mémoires",
        types: {
          assignation: {
            label: "Assignation",
            fields: [
              { id: "demandeur", label: "Demandeur", type: "text", required: true },
              { id: "defendeur", label: "Défendeur", type: "text", required: true },
              { id: "objet", label: "Objet du litige", type: "textarea", required: true },
              { id: "moyens", label: "Moyens", type: "textarea", required: true },
              { id: "pretentions", label: "Prétentions", type: "textarea", required: true }
            ]
          },
          requete: {
            label: "Requête",
            fields: [
              { id: "requerant", label: "Requérant", type: "text", required: true },
              { id: "juridiction", label: "Juridiction", type: "text", required: true },
              { id: "objet", label: "Objet de la requête", type: "textarea", required: true },
              { id: "motifs", label: "Motifs", type: "textarea", required: true }
            ]
          },
          conclusions: {
            label: "Conclusions",
            fields: [
              { id: "partie", label: "Partie", type: "text", required: true },
              { id: "adversaire", label: "Partie adverse", type: "text", required: true },
              { id: "faits", label: "Exposé des faits", type: "textarea", required: true },
              { id: "discussion", label: "Discussion", type: "textarea", required: true },
              { id: "demandes", label: "Demandes", type: "textarea", required: true }
            ]
          },
          memoire: {
            label: "Mémoire",
            fields: [
              { id: "auteur", label: "Auteur", type: "text", required: true },
              { id: "destinataire", label: "Destinataire", type: "text", required: true },
              { id: "objet", label: "Objet", type: "textarea", required: true },
              { id: "argumentation", label: "Argumentation", type: "textarea", required: true }
            ]
          }
        }
      },
      dossiers_pieces: {
        label: "Dossiers de pièces",
        types: {
          bordereau: {
            label: "Bordereau de pièces",
            fields: [
              { id: "procedure", label: "Type de procédure", type: "text", required: true },
              { id: "partie", label: "Partie", type: "text", required: true },
              { id: "pieces", label: "Liste des pièces", type: "textarea", required: true },
              { id: "commentaires", label: "Commentaires", type: "textarea", required: false }
            ]
          }
        }
      },
      correspondances: {
        label: "Correspondances procédurales",
        types: {
          lettre_greffe: {
            label: "Lettre au greffe",
            fields: [
              { id: "expediteur", label: "Expéditeur", type: "text", required: true },
              { id: "juridiction", label: "Juridiction", type: "text", required: true },
              { id: "reference", label: "Référence du dossier", type: "text", required: true },
              { id: "objet", label: "Objet", type: "textarea", required: true }
            ]
          },
          convocation: {
            label: "Convocation",
            fields: [
              { id: "destinataire", label: "Destinataire", type: "text", required: true },
              { id: "date", label: "Date de convocation", type: "text", required: true },
              { id: "lieu", label: "Lieu", type: "text", required: true },
              { id: "objet", label: "Objet", type: "textarea", required: true }
            ]
          },
          notification: {
            label: "Notification",
            fields: [
              { id: "expediteur", label: "Expéditeur", type: "text", required: true },
              { id: "destinataire", label: "Destinataire", type: "text", required: true },
              { id: "objet", label: "Objet", type: "textarea", required: true },
              { id: "contenu", label: "Contenu", type: "textarea", required: true }
            ]
          }
        }
      },
      protocoles: {
        label: "Modèles de protocoles transactionnels",
        types: {
          protocole: {
            label: "Protocole transactionnel",
            fields: [
              { id: "parties", label: "Parties", type: "text", required: true },
              { id: "litige", label: "Description du litige", type: "textarea", required: true },
              { id: "concessions", label: "Concessions réciproques", type: "textarea", required: true },
              { id: "modalites", label: "Modalités d'exécution", type: "textarea", required: true }
            ]
          }
        }
      },
      arbitrage: {
        label: "Actes d'arbitrage",
        types: {
          termes_reference: {
            label: "Termes de référence",
            fields: [
              { id: "parties", label: "Parties", type: "text", required: true },
              { id: "arbitres", label: "Tribunal arbitral", type: "text", required: true },
              { id: "litige", label: "Objet du litige", type: "textarea", required: true },
              { id: "procedure", label: "Règles de procédure", type: "textarea", required: true }
            ]
          },
          demande: {
            label: "Demande d'arbitrage",
            fields: [
              { id: "demandeur", label: "Demandeur", type: "text", required: true },
              { id: "defendeur", label: "Défendeur", type: "text", required: true },
              { id: "objet", label: "Objet de la demande", type: "textarea", required: true },
              { id: "fondement", label: "Fondement", type: "textarea", required: true }
            ]
          },
          reponse: {
            label: "Réponse à la demande",
            fields: [
              { id: "repondant", label: "Répondant", type: "text", required: true },
              { id: "reference", label: "Référence demande", type: "text", required: true },
              { id: "position", label: "Position", type: "textarea", required: true },
              { id: "arguments", label: "Arguments", type: "textarea", required: true }
            ]
          },
          memoire_arbitrage: {
            label: "Mémoire en arbitrage",
            fields: [
              { id: "partie", label: "Partie", type: "text", required: true },
              { id: "faits", label: "Exposé des faits", type: "textarea", required: true },
              { id: "discussion", label: "Discussion", type: "textarea", required: true },
              { id: "demandes", label: "Demandes", type: "textarea", required: true }
            ]
          }
        }
      }
    }
  },
  documents_internes: {
    label: "Documents internes et organisationnels",
    options: {
      templates: {
        label: "Templates internes",
        types: {
          note_frais: {
            label: "Note de frais",
            fields: [
              { id: "collaborateur", label: "Collaborateur", type: "text", required: true },
              { id: "date", label: "Date", type: "text", required: true },
              { id: "montant", label: "Montant", type: "text", required: true },
              { id: "description", label: "Description", type: "textarea", required: true },
              { id: "justificatifs", label: "Justificatifs", type: "textarea", required: true }
            ]
          },
          feuille_temps: {
            label: "Feuille de temps",
            fields: [
              { id: "collaborateur", label: "Collaborateur", type: "text", required: true },
              { id: "periode", label: "Période", type: "text", required: true },
              { id: "activites", label: "Activités", type: "textarea", required: true },
              { id: "temps_passe", label: "Temps passé", type: "textarea", required: true }
            ]
          },
          checklist: {
            label: "Checklist",
            fields: [
              { id: "titre", label: "Titre", type: "text", required: true },
              { id: "description", label: "Description", type: "textarea", required: true },
              { id: "elements", label: "Éléments à vérifier", type: "textarea", required: true }
            ]
          }
        }
      },
      procedures_internes: {
        label: "Procédures internes",
        types: {
          ouverture_dossier: {
            label: "Ouverture de dossier",
            fields: [
              { id: "client", label: "Client", type: "text", required: true },
              { id: "type_dossier", label: "Type de dossier", type: "text", required: true },
              { id: "responsable", label: "Responsable", type: "text", required: true },
              { id: "description", label: "Description", type: "textarea", required: true }
            ]
          },
          archivage: {
            label: "Archivage",
            fields: [
              { id: "dossier", label: "Dossier", type: "text", required: true },
              { id: "date_archivage", label: "Date d'archivage", type: "text", required: true },
              { id: "documents", label: "Documents à archiver", type: "textarea", required: true },
              { id: "localisation", label: "Localisation", type: "text", required: true }
            ]
          },
          validation_qualite: {
            label: "Validation qualité",
            fields: [
              { id: "document", label: "Document", type: "text", required: true },
              { id: "verificateur", label: "Vérificateur", type: "text", required: true },
              { id: "criteres", label: "Critères de validation", type: "textarea", required: true },
              { id: "commentaires", label: "Commentaires", type: "textarea", required: true }
            ]
          }
        }
      },
      guides_fiches: {
        label: "Guides et fiches pratiques",
        types: {
          guide_droit: {
            label: "Guide par domaine de droit",
            fields: [
              { id: "domaine", label: "Domaine de droit", type: "text", required: true },
              { id: "contenu", label: "Contenu du guide", type: "textarea", required: true },
              { id: "references", label: "Références", type: "textarea", required: true }
            ]
          },
          fiche_dossier: {
            label: "Fiche par type de dossier",
            fields: [
              { id: "type_dossier", label: "Type de dossier", type: "text", required: true },
              { id: "procedure", label: "Procédure à suivre", type: "textarea", required: true },
              { id: "points_attention", label: "Points d'attention", type: "textarea", required: true }
            ]
          }
        }
      },
      politiques: {
        label: "Politiques internes",
        types: {
          confidentialite: {
            label: "Confidentialité",
            fields: [
              { id: "scope", label: "Champ d'application", type: "textarea", required: true },
              { id: "mesures", label: "Mesures de protection", type: "textarea", required: true },
              { id: "obligations", label: "Obligations", type: "textarea", required: true }
            ]
          },
          cybersecurite: {
            label: "Cybersécurité",
            fields: [
              { id: "regles", label: "Règles de sécurité", type: "textarea", required: true },
              { id: "procedures", label: "Procédures d'urgence", type: "textarea", required: true },
              { id: "formation", label: "Formation requise", type: "textarea", required: true }
            ]
          },
          conflits_interets: {
            label: "Conflits d'intérêts",
            fields: [
              { id: "definition", label: "Définition", type: "textarea", required: true },
              { id: "prevention", label: "Mesures de prévention", type: "textarea", required: true },
              { id: "resolution", label: "Procédure de résolution", type: "textarea", required: true }
            ]
          }
        }
      }
    }
  },
  conformite_deontologie: {
    label: "Conformité et déontologie",
    options: {
      registres: {
        label: "Registres obligatoires",
        types: {
          traitement_donnees: {
            label: "Traitement de données",
            fields: [
              { id: "finalite", label: "Finalité du traitement", type: "textarea", required: true },
              { id: "categories", label: "Catégories de données", type: "textarea", required: true },
              { id: "destinataires", label: "Destinataires", type: "textarea", required: true },
              { id: "duree_conservation", label: "Durée de conservation", type: "text", required: true },
              { id: "mesures_securite", label: "Mesures de sécurité", type: "textarea", required: true }
            ]
          },
          registre_lobbyisme: {
            label: "Registre de lobbyisme",
            fields: [
              { id: "representant", label: "Représentant", type: "text", required: true },
              { id: "organisation", label: "Organisation", type: "text", required: true },
              { id: "activites", label: "Activités de lobbying", type: "textarea", required: true },
              { id: "decisions_visees", label: "Décisions visées", type: "textarea", required: true }
            ]
          },
          registre_delegation: {
            label: "Registre de délégation",
            fields: [
              { id: "delegant", label: "Délégant", type: "text", required: true },
              { id: "delegataire", label: "Délégataire", type: "text", required: true },
              { id: "pouvoirs", label: "Pouvoirs délégués", type: "textarea", required: true },
              { id: "date_effet", label: "Date d'effet", type: "text", required: true }
            ]
          }
        }
      },
      formulaires_cnil: {
        label: "Formulaires CNIL / RGPD",
        types: {
          declaration_traitement: {
            label: "Déclaration de traitement",
            fields: [
              { id: "responsable", label: "Responsable du traitement", type: "text", required: true },
              { id: "finalite", label: "Finalité", type: "textarea", required: true },
              { id: "donnees", label: "Données traitées", type: "textarea", required: true },
              { id: "base_legale", label: "Base légale", type: "textarea", required: true }
            ]
          },
          analyse_impact: {
            label: "Analyse d'impact",
            fields: [
              { id: "traitement", label: "Description du traitement", type: "textarea", required: true },
              { id: "necessite", label: "Nécessité et proportionnalité", type: "textarea", required: true },
              { id: "risques", label: "Risques identifiés", type: "textarea", required: true },
              { id: "mesures", label: "Mesures prévues", type: "textarea", required: true }
            ]
          }
        }
      },
      conformite_lab: {
        label: "Documents de conformité LAB-FT",
        types: {
          procedure_identification: {
            label: "Procédure d'identification",
            fields: [
              { id: "client", label: "Client", type: "text", required: true },
              { id: "documents", label: "Documents requis", type: "textarea", required: true },
              { id: "verification", label: "Mesures de vérification", type: "textarea", required: true },
              { id: "risques", label: "Évaluation des risques", type: "textarea", required: true }
            ]
          },
          declaration_soupcon: {
            label: "Déclaration de soupçon",
            fields: [
              { id: "declarant", label: "Déclarant", type: "text", required: true },
              { id: "operation", label: "Opération suspecte", type: "textarea", required: true },
              { id: "motifs", label: "Motifs de soupçon", type: "textarea", required: true },
              { id: "pieces", label: "Pièces jointes", type: "textarea", required: true }
            ]
          }
        }
      },
      deontologie: {
        label: "Documents déontologiques",
        types: {
          serment: {
            label: "Serment",
            fields: [
              { id: "professionnel", label: "Professionnel", type: "text", required: true },
              { id: "date", label: "Date", type: "text", required: true },
              { id: "texte", label: "Texte du serment", type: "textarea", required: true }
            ]
          },
          rin: {
            label: "RIN",
            fields: [
              { id: "article", label: "Article", type: "text", required: true },
              { id: "contenu", label: "Contenu", type: "textarea", required: true },
              { id: "commentaires", label: "Commentaires", type: "textarea", required: true }
            ]
          },
          charte_ethique: {
            label: "Charte éthique",
            fields: [
              { id: "cabinet", label: "Cabinet", type: "text", required: true },
              { id: "principes", label: "Principes", type: "textarea", required: true },
              { id: "engagements", label: "Engagements", type: "textarea", required: true }
            ]
          }
        }
      }
    }
  }
};
