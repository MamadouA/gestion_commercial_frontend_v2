import { ArrowLeftRegular, ArrowSyncRegular, HomeRegular, WarningRegular } from "@fluentui/react-icons";
import { isRouteErrorResponse, useRouteError } from "react-router";

const ErrorScreen = () => {
  const error = useRouteError();

  let status = 500;
  let title = "Une erreur est survenue";
  let message =
    "Une erreur inattendue s'est produite. Veuillez réessayer dans quelques instants.";

  if (isRouteErrorResponse(error)) {
    status = error.status;

    switch (error.status) {
      case 400:
        title = "Requête invalide";
        message =
          "La requête envoyée n'est pas valide. Veuillez vérifier vos informations.";
        break;

      case 401:
        title = "Accès non autorisé";
        message =
          "Votre session a peut-être expiré. Veuillez vous reconnecter.";
        break;

      case 403:
        title = "Accès refusé";
        message =
          "Vous n'avez pas les permissions nécessaires pour accéder à cette page.";
        break;

      case 404:
        title = "Page introuvable";
        message =
          "La page que vous recherchez n'existe pas ou a été déplacée.";
        break;

      case 408:
        title = "Délai d'attente dépassé";
        message =
          "La requête a pris trop de temps. Veuillez réessayer.";
        break;

      case 429:
        title = "Trop de requêtes";
        message =
          "Vous avez effectué trop de requêtes. Veuillez patienter avant de réessayer.";
        break;

      case 500:
        title = "Erreur serveur";
        message =
          "Nos serveurs rencontrent actuellement un problème. Veuillez réessayer plus tard.";
        break;

      case 502:
      case 503:
      case 504:
        title = "Service temporairement indisponible";
        message =
          "Le service est momentanément indisponible. Veuillez réessayer dans quelques instants.";
        break;
    }
  }

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <WarningRegular />
        </div>

        {/* Status */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
          Erreur {status}
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>

        {/* Message */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <ArrowSyncRegular />
            Réessayer
          </button>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <ArrowLeftRegular />
            Retour
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <HomeRegular />
            Accueil
          </button>
        </div>

        {/* Support information */}
        <p className="mt-8 text-xs text-gray-400">
          Si le problème persiste, veuillez contacter votre administrateur.
        </p>
      </div>
    </main>
  );
};

export default ErrorScreen;