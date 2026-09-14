import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="site-grid py-20">
      <div className="site-cols">
        <div className="col-span-8">
          <p className="label-num mb-3">404</p>
          <h1 className="display mb-4">Page not found</h1>
          <p className="body-muted mb-8">
            That URL is not published, or it never existed.
          </p>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
